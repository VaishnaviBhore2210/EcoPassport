package com.ecopassport.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecopassport.model.LifecycleEvent;
import com.ecopassport.model.Product;
import com.ecopassport.model.User;
import com.ecopassport.repo.EventRepo;
import com.ecopassport.repo.ProductRepo;
import com.ecopassport.repo.UserRepo;
import com.ecopassport.service.AiService;

@RestController
@RequestMapping("/api")
public class ApiController {

    final UserRepo ur;
    final ProductRepo pr;
    final EventRepo er;
    final AiService ai;
    final BCryptPasswordEncoder enc = new BCryptPasswordEncoder();

    @SuppressWarnings("unused")
    ApiController(UserRepo u, ProductRepo p, EventRepo e, AiService a) {
        ur = u;
        pr = p;
        er = e;
        ai = a;
    }

    @PostMapping("/auth/register")
    public Map register(@RequestBody Map<String, String> x) {
        if (ur.findByEmail(x.get("email")).isPresent())
            throw new RuntimeException("Email already registered");
        User u = ur.save(new User(x.get("name"), x.get("email"), enc.encode(x.get("password")), x.getOrDefault("role", "MANUFACTURER")));
        return Map.of("id", u.getId(), "name", u.getName(), "email", u.getEmail(), "role", u.getRole());
    }

    @PostMapping("/auth/login")
    public Map login(@RequestBody Map<String, String> x) {
        User u = ur.findByEmail(x.get("email")).orElseThrow(() -> new RuntimeException("Invalid email or password"));
        if (!enc.matches(x.get("password"), u.getPassword()))
            throw new RuntimeException("Invalid email or password");
        return Map.of("id", u.getId(), "name", u.getName(), "email", u.getEmail(), "role", u.getRole());
    }

     @GetMapping("/products")
    public List<Product> products() {
        return pr.findAll();
    }

        @GetMapping("/admin/users")
    public List<Map<String, Object>> allUsers() {
        return ur.findAll().stream()
            .map(u -> Map.<String, Object>of("id", u.getId(), "name", u.getName(), "email", u.getEmail(), "role", u.getRole()))
            .toList();
    }
    @PostMapping("/admin/products/{id}/approve")
    public Product approveProduct(@PathVariable Long id) {
        Product p = pr.findById(id).orElseThrow();
        p.setApproved(true);
        return pr.save(p);
    }

    @PostMapping("/admin/products/{id}/reject")
    public Product rejectProduct(@PathVariable Long id) {
        Product p = pr.findById(id).orElseThrow();
        p.setApproved(false);
        return pr.save(p);
    }

    @PostMapping("/products")
    public Product add(@RequestBody Product p) {
        p.setPassportId("ECO-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        Product q = pr.save(p);
        ai.analyze(q);
        return pr.save(q);
    }

    @GetMapping("/products/{id}")
    public Product one(@PathVariable Long id) {
        return pr.findById(id).orElseThrow();
    }

    @GetMapping("/products/passport/{passportId}")
    public Product byPassportId(@PathVariable String passportId) {
        return pr.findByPassportId(passportId).orElseThrow();
    }

    @PostMapping("/products/{id}/ai-analysis")
    public Product analyze(@PathVariable Long id) {
        Product p = pr.findById(id).orElseThrow();
        ai.analyze(p);
        return pr.save(p);
    }

       @PostMapping("/products/{id}/image")
    public Product uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        Product p = pr.findById(id).orElseThrow();
        File dir = new File("uploads").getAbsoluteFile();
        if (!dir.exists()) dir.mkdirs();
        String filename = id + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File dest = new File(dir, filename);
        file.transferTo(dest);
        p.setImageUrl("/uploads/" + filename);
        return pr.save(p);
    }
       @GetMapping("/events/recent")
    public List<LifecycleEvent> recentEvents() {
        return er.findTop10ByOrderByIdDesc();
    }

    @GetMapping("/products/{id}/lifecycle")
    public List<LifecycleEvent> events(@PathVariable Long id) {
        return er.findByProductIdOrderByEventDateAsc(id);
    }

 

    @PostMapping("/products/{id}/lifecycle")
    public LifecycleEvent event(@PathVariable Long id, @RequestBody LifecycleEvent e) {
        Product p = pr.findById(id).orElseThrow();
        e.setProduct(p);
        if (e.getEventDate() == null) e.setEventDate(LocalDate.now());
        return er.save(e);
    }
}