package com.warren.bob.controllers.book;

import com.warren.bob.models.bookbase.BookBaseDAO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;


@RestController()
@RequestMapping("/api")
@CrossOrigin
public class BookBaseController {

    @Resource
    private BookBaseDAO bookBaseDAO;

    @GetMapping("/book/titles")
    public List<String> getBooks() {
        return bookBaseDAO.getTitles();
    }
}