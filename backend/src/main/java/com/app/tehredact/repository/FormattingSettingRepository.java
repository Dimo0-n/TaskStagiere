package com.app.tehredact.repository;

import com.app.tehredact.entity.FormattingSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormattingSettingRepository extends JpaRepository<FormattingSettings, Long> {
}
