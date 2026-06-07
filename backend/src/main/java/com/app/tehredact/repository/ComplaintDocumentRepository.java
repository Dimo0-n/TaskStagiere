package com.app.tehredact.repository;

import com.app.tehredact.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintDocumentRepository extends JpaRepository<Complaint, Long> {
}
