package com.warren.bob.models.bookbase;

import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
public class BookBaseDAO {


    @Resource
    private BookBaseRepository bookBaseRepository;

    public void createBook(BookBaseEntity book) {
        bookBaseRepository.save(book);
    }

    public boolean exists(BookBaseEntity book) {
        List<BookBaseEntity> allByTitleAndAuthor = bookBaseRepository.findAllByTitleAndAuthor(book.getTitle(), book.getAuthor());
        return !allByTitleAndAuthor.isEmpty();
    }

    public List<String> getTitles() {
        return StreamSupport.stream(bookBaseRepository.findAll().spliterator(), false)
                .map(BookBaseEntity::getTitle).collect(Collectors.toList());

    }
}
