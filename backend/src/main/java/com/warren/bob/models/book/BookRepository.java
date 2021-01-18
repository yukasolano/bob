package com.warren.bob.models.book;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<BookEntity, Long> {

    List<BookEntity> findAllByBookStatus(BookStatus status);
}
