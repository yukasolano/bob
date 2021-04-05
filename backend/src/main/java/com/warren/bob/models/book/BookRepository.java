package com.warren.bob.models.book;

import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookRepository extends CrudRepository<BookEntity, Long> {

    List<BookEntity> findAllByBookStatusAndUsername(BookStatus status, String username);

    List<BookEntity> findAllByBookStatusAndUsernameAndEndDateBetween(BookStatus status, String username, LocalDate start, LocalDate end);
}
