package ecommerce.com.srishakram.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer quantity;
    private String image;
    private Double price;

    // 🔹 Order reference (VERY IMPORTANT)
    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Orders order;

    // 🔹 Product reference
    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private products products;
}

