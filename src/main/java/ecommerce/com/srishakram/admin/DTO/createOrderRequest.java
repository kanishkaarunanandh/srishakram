package ecommerce.com.srishakram.admin.DTO;

import ecommerce.com.srishakram.models.OrderItem;
import lombok.Data;

import java.util.List;

@Data
public class createOrderRequest {
    private List<OrderItemDto> orderItems;
}
