package com.warren.bob.controllers.book;

import com.warren.bob.models.book.BookDAO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/book/{id}")
    public BookDTO getBook(@PathVariable(name = "id") Long id) {
        return bookDAO.getBook(id);
    }

    @PostMapping("/book")
    public void createBook(@RequestBody BookDTO dto) {
        bookDAO.createBook(dto);
    }

    @PutMapping("/book")
    public void updateBook(@RequestBody BookDTO dto) {
        bookDAO.updateBook(dto);
    }

    @DeleteMapping("/book/{id}")
    public void deleteBook(@PathVariable(name = "id") Long id) {
        bookDAO.deleteBook(id);
    }

    @PostMapping("/book/start")
    public void start(@RequestBody BookActionDTO dto) {
        bookDAO.startReading(dto);
    }

    @PostMapping("/book/finish")
    public void finish(@RequestBody BookActionDTO dto) {
        bookDAO.finishReading(dto);
    }
}
