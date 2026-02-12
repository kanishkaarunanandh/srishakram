package ecommerce.com.srishakram.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Orders {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
   private Long id;
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name="order_id")
   private List<OrderItem> orderItems = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    private Double totalItemsAmount;
   private Double taxAmount;
   private Double totalAmount;
   private String status;
   private String orderNo;
}
