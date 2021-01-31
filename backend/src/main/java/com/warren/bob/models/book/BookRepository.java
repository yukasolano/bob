package com.warren.bob.models.book;

import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookRepository extends CrudRepository<BookEntity, Long> {

    List<BookEntity> findAllByBookStatus(BookStatus status);

    List<BookEntity> findAllByBookStatusAndEndDateBetween(BookStatus status, LocalDate start, LocalDate end);
}
