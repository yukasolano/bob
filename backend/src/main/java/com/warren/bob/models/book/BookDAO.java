package com.warren.bob.models.book;

import com.warren.bob.controllers.book.BookActionDTO;
import com.warren.bob.controllers.book.BookListDTO;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
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

    private void createBook(String name, BookStatus status) {
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

    public boolean startReading(BookActionDTO dto) {
       Optional<BookEntity> entity = bookRepository.findById(dto.getId());
       if(entity.isPresent()) {
           if(entity.get().getBookStatus().equals(BookStatus.NOT_READ)) {
               entity.get().setBookStatus(BookStatus.READING);
               entity.get().setStartDate(dto.getDate());
               bookRepository.save(entity.get());
               return true;
           }
           //erro:  wrong state
           return false;
       }
       //erro: id nao existe
        return false;
    }

    public boolean finishReading(BookActionDTO dto) {
        Optional<BookEntity> entity = bookRepository.findById(dto.getId());
        if(entity.isPresent()) {
            if(entity.get().getBookStatus().equals(BookStatus.READING)) {
                entity.get().setBookStatus(BookStatus.READ);

                if(entity.get().getStartDate() == null || entity.get().getStartDate().isAfter(dto.getDate())) {
                    //erro: start date not exist or is after then finish date
                    return false;
                } else {
                    entity.get().setStartDate(dto.getDate());
                    bookRepository.save(entity.get());
                    return true;
                }
            }
            //erro:  wrong state
            return false;
        }
        //erro: id nao existe
        return false;
    }

}
