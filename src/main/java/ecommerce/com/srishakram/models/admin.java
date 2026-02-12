package ecommerce.com.srishakram.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class admin {
    @GeneratedValue
    @Id
    private Long id;

    private String role;
    private String password;
}
