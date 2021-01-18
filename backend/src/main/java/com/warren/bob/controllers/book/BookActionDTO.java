package com.warren.bob.controllers.book;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookActionDTO {

    private Long id;
    private LocalDate date;
}
