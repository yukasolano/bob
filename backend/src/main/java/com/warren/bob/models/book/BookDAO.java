package com.warren.bob.models.book;

import com.warren.bob.controllers.book.BookActionDTO;
import com.warren.bob.controllers.book.BookDTO;
import com.warren.bob.controllers.book.BookListDTO;
import com.warren.bob.models.InvalidParameterException;
import com.warren.bob.models.RegisterNotFoundException;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class BookDAO {


    @Resource
    private BookRepository bookRepository;

    //@PostConstruct
    private void generateData() {
        createBook("Livro 1", BookStatus.NOT_READ);
        createBook("Livro 2", BookStatus.NOT_READ);
        createBook("Livro 3", BookStatus.NOT_READ);
        createBook("Livro 4", BookStatus.NOT_READ);
    }

    private void createBook(String name,
                            BookStatus status) {
        BookEntity bookEntity = new BookEntity();
        bookEntity.setTitle(name);
        bookEntity.setBookStatus(status);
        bookRepository.save(bookEntity);
    }

    public List<BookListDTO> getBooksByStatus(String status) {

        BookStatus bookStatus = BookStatus.valueOf(status);
        if (bookStatus == null) {
            return Collections.emptyList();
        }
        return bookRepository.findAllByBookStatus(bookStatus).stream().map(it -> {
            BookListDTO dto = new BookListDTO();
            dto.setId(it.getId());
            dto.setTitle(it.getTitle());
            dto.setStatus(it.getBookStatus());
            return dto;
        }).collect(Collectors.toList());
    }

    public void startReading(BookActionDTO dto) {
        Optional<BookEntity> opEntity = bookRepository.findById(dto.getId());

        if (!opEntity.isPresent()) {
            throw new RegisterNotFoundException(String.format("Book (%d) not found", dto.getId()));
        }

        BookEntity entity = opEntity.get();

        if (!entity.getBookStatus().equals(BookStatus.NOT_READ)) {
            throw new InvalidParameterException(String.format("Book %s (%d) should be on NOT_READ status", entity.getTitle(), entity.getId()));
        }

        entity.setBookStatus(BookStatus.READING);
        entity.setStartDate(dto.getDate());
        bookRepository.save(entity);
    }

    public void finishReading(BookActionDTO dto) {
        Optional<BookEntity> opEntity = bookRepository.findById(dto.getId());

        if (!opEntity.isPresent()) {
            throw new RegisterNotFoundException(String.format("Book (%d) not found", dto.getId()));
        }

        BookEntity entity = opEntity.get();

        if (!entity.getBookStatus().equals(BookStatus.READING)) {
            throw new InvalidParameterException(String.format("Book %s (%d) should be on READING status", entity.getTitle(), entity.getId()));
        }

        if (entity.getStartDate() == null || entity.getStartDate().isAfter(dto.getDate())) {
            throw new InvalidParameterException(String.format("Book %s (%d) does not have a start date or it is after the finish date", entity.getTitle(), entity.getId()));
        }

        entity.setBookStatus(BookStatus.READ);
        entity.setEndDate(dto.getDate());
        bookRepository.save(entity);
    }

    public BookDTO getBook(Long id) {
        Optional<BookEntity> opEntity = bookRepository.findById(id);

        if (!opEntity.isPresent()) {
            throw new RegisterNotFoundException(String.format("Book (%d) not found", id));
        }

        BookDTO dto = new BookDTO();
        dto.setId(opEntity.get().getId());
        dto.setTitle(opEntity.get().getTitle());
        dto.setAuthor(opEntity.get().getAuthor());
        dto.setBookStatus(opEntity.get().getBookStatus());
        dto.setPages(opEntity.get().getPages());
        dto.setPublisher(opEntity.get().getPublisher());
        dto.setSubject(opEntity.get().getSubject());
        dto.setStartDate(opEntity.get().getStartDate());
        dto.setEndDate(opEntity.get().getEndDate());
        return dto;
    }

    public void createBook(BookDTO dto) {
        if (dto.getId() != null) {
            throw new InvalidParameterException("Use PUT to update a book's information");
        }

        bookRepository.save(convert(dto));
    }

    public void updateBook(BookDTO dto) {
        if (!bookRepository.findById(dto.getId()).isPresent()) {
            throw new RegisterNotFoundException("Use POST to create a new book");
        }
        bookRepository.save(convert(dto));
    }

    public void deleteBook(Long id) {
        Optional<BookEntity> opEntity = bookRepository.findById(id);

        if (!opEntity.isPresent()) {
            throw new RegisterNotFoundException(String.format("Book (%d) does not exist", id));
        }

        bookRepository.deleteById(id);
    }

    private BookEntity convert(BookDTO dto) {

        if (BookStatus.NOT_READ.equals(dto.getBookStatus()) && (dto.getStartDate() != null || dto.getEndDate() != null)) {
            throw new InvalidParameterException("In a NOT_READ status, both dates must be null");
        }

        if (BookStatus.READING.equals(dto.getBookStatus()) && (dto.getStartDate() == null || dto.getEndDate() != null)) {
            throw new InvalidParameterException("In a READING status, start date must be not null and end date must be null");
        }

        if (BookStatus.READ.equals(dto.getBookStatus()) && (dto.getStartDate() == null || dto.getEndDate() == null ||
                dto.getStartDate().isAfter(dto.getEndDate()))) {
            throw new InvalidParameterException("In a READ status, end date must be after or equal start date");
        }

        BookEntity entity = new BookEntity();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setAuthor(dto.getAuthor());
        entity.setBookStatus(dto.getBookStatus());
        entity.setPages(dto.getPages());
        entity.setPublisher(dto.getPublisher());
        entity.setSubject(dto.getPublisher());
        entity.setSubject(dto.getSubject());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        return entity;
    }
}
