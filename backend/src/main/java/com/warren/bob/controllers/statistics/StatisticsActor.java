package com.warren.bob.controllers.statistics;

import com.warren.bob.models.book.BookEntity;
import com.warren.bob.models.book.BookRepository;
import com.warren.bob.models.book.BookStatus;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.List;

@Component
public class StatisticsActor {

    @Resource
    private BookRepository bookRepository;


    public StatisticsDTO compute(LocalDate data) {

        List<BookEntity> books = bookRepository.findAllByBookStatusAndEndDateBetween(BookStatus.READ, data.minusYears(1), data);

        StatisticsDTO dto = new StatisticsDTO();

        Integer qtdBooks = books.size();
        double qtdPages = books.stream().mapToDouble(BookEntity::getPages).sum();
        dto.setBooksRead(qtdBooks);
        dto.setBooksPerMonth(qtdBooks/12.0);
        dto.setPagesPerDay(qtdPages/365.0);

        return dto;

    }
}
