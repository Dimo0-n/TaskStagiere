package com.app.tehredact.repository;

import com.app.tehredact.entity.FormattingSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormattingSettingRepository extends JpaRepository<FormattingSettings, Long> {
}
