package com.warren.bob.controllers.statistics;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.time.LocalDate;


@RestController()
@RequestMapping("/api")
@CrossOrigin
public class StatisticsController {

    @Resource
    private StatisticsActor actor;

    @GetMapping("/statistics")
    public StatisticsDTO getBooks(@RequestParam(name = "date") String date) {
        return actor.compute(LocalDate.parse(date));
    }
}