package com.example.practice.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {


    @GetMapping("/")
    public String loginMenu() {
        return "loginMenu";
    }

    @GetMapping("/index")
    public String index(HttpSession session, Model model) {
//        String memberId = (String) session.getAttribute("memberId");
//        String memberPw = (String) session.getAttribute("memberPw");
//        session.getAttribute("memberPw");
//        if (session.getAttribute("memberId") == null) {
//            return "loginMenu";
//        } else {
//            System.out.println("인덱스 아이디: " + "memberId");
//            System.out.println("인덱스 비밀번호: " + "memberPw");
//            model.addAttribute("memberId", memberId);
//            model.addAttribute("memberPw", memberPw);
//            return "index";
//        }
        return "index";
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }

}
