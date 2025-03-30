package com.example.project.schedulingtasks;




import com.example.project.service.AvailableRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class ScheduledTasks {
    private static final Logger log = (Logger) LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    private final AvailableRepository availableRepository;

    public ScheduledTasks(AvailableRepository availableRepository) {
        this.availableRepository = availableRepository;
    }

    @Scheduled( cron = "0 0 0 * * ?" )
    public void reportCurrentTime() {
        log.info("The time is now {}"+ dateFormat.format(new Date()));
        availableRepository.updateAvailStatus();
    }
}
