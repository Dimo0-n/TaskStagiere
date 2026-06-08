package com.app.tehredact.repository;

import com.app.tehredact.entity.PowerOfAttorney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PowerOfAttorneyRepository extends JpaRepository<PowerOfAttorney, Long> {
}
