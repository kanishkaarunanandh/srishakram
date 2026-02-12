package ecommerce.com.srishakram.Contoller;

import ecommerce.com.srishakram.Service.OrdersService;
import ecommerce.com.srishakram.admin.DTO.createOrderRequest;
import ecommerce.com.srishakram.admin.DTO.orderCreated;
import ecommerce.com.srishakram.models.CustomerSelection;
import ecommerce.com.srishakram.models.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/api/orders")
    public ResponseEntity<?> createOrder(@RequestBody createOrderRequest orderRequest)
    {
       orderCreated orderCreated = ordersService.createOrder(orderRequest);
       return ResponseEntity.ok().body(orderCreated);
    }

    @GetMapping("/orders/{orderNo}")
    public ResponseEntity<?>  getOrders(@PathVariable String orderNo)
    {
       Orders order = ordersService.getOrder(orderNo);
       return ResponseEntity.ok().body(order);
    }
}
