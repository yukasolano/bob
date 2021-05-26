package com.warren.bob.controllers.book;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import com.warren.bob.models.bookbase.BookBaseDAO;
import com.warren.bob.models.bookbase.BookBaseEntity;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

@Component
public class BookLoader {

    @Resource
    BookBaseDAO dao;

    @PostConstruct
    public void load() {
        try {
            CSVReader reader = new CSVReader(new FileReader("src/main/resources/books.csv"));
            String[] lineInArray;
            reader.readNext();
            while ((lineInArray = reader.readNext()) != null) {
                BookBaseEntity book = new BookBaseEntity();
                book.setTitle(lineInArray[0]);
                book.setAuthor(lineInArray[2]);
                book.setSubject(lineInArray[4]);
                book.setPages(convertToIntNotNull(lineInArray[15]));
                if (!dao.exists(book)) {
                    dao.createBook(book);
                }
            }

        } catch (FileNotFoundException | CsvValidationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Integer convertToIntNotNull(String number) {
        if (StringUtils.isEmpty(number)) {
            return 0;
        }
        return Integer.parseInt(number);

    }
}
