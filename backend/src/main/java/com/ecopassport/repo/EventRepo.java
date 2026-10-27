package com.ecopassport.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecopassport.model.LifecycleEvent;

public interface EventRepo extends JpaRepository<LifecycleEvent, Long> {
    List<LifecycleEvent> findByProductIdOrderByEventDateAsc(Long id);
    List<LifecycleEvent> findTop10ByOrderByIdDesc();
}