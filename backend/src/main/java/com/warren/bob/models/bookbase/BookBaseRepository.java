package com.warren.bob.models.bookbase;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookBaseRepository extends CrudRepository<BookBaseEntity, Long> {

    List<BookBaseEntity> findAllByTitleAndAuthor(String title,
                                                 String author);

}