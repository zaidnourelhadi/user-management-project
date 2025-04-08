package com.security.usersmanagement.repository;

import com.security.usersmanagement.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepo extends JpaRepository<OurUsers,Integer> {

    Optional<OurUsers> findByEmail(String email);
}
