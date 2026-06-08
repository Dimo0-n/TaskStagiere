package com.app.tehredact.repository;

import com.app.tehredact.entity.StatementOfClaim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatementOfClaimRepository extends JpaRepository<StatementOfClaim, Long> {
}
