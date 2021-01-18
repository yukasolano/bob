package com.warren.bob.controllers.book;

import com.warren.bob.models.book.BookDAO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController()
@RequestMapping("/api")
@CrossOrigin
public class BookController {

    @Resource
    private BookDAO bookDAO;

    @GetMapping("/book")
    public List<BookListDTO> getBooks(@RequestParam(name = "status") String status) {
        return bookDAO.getBooksByStatus(status);
    }

    @PostMapping("/book/start")
    public void start(@RequestBody BookActionDTO dto) {
        if(!bookDAO.startReading(dto)) {
            throw new RuntimeException("Erro");
        }
    }

    @PostMapping("/book/finish")
    public void finish(@RequestBody BookActionDTO dto) {
        if(!bookDAO.finishReading(dto)) {
            throw new RuntimeException("Erro");
        }
    }
}
