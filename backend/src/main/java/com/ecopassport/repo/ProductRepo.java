package com.ecopassport.repo; import java.util.Optional;

 import org.springframework.data.jpa.repository.JpaRepository;

 import com.ecopassport.model.Product; public interface ProductRepo extends JpaRepository<Product,Long>{ Optional<Product> findByPassportId(String passportId); }
