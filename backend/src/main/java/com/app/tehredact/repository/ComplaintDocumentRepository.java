package com.app.tehredact.repository;

import com.app.tehredact.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintDocumentRepository extends JpaRepository<Complaint, Long> {
}
