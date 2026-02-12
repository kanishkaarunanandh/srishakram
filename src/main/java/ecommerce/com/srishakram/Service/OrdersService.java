package ecommerce.com.srishakram.Service;

import ecommerce.com.srishakram.Repository.OrdersRepository;
import ecommerce.com.srishakram.Repository.productRepository;
import ecommerce.com.srishakram.admin.DTO.OrderItemDto;
import ecommerce.com.srishakram.admin.DTO.createOrderRequest;
import ecommerce.com.srishakram.admin.DTO.orderCreated;
import ecommerce.com.srishakram.models.OrderItem;
import ecommerce.com.srishakram.models.Orders;
import ecommerce.com.srishakram.models.products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private productRepository productRepository;

    public orderCreated createOrder(createOrderRequest orderRequest)
    {
        Orders order = new Orders();
        order.setStatus("PENDING");
        double totalItemsAmount =0;
        for(OrderItemDto item:orderRequest.getOrderItems()){
            OrderItem orderItem = new OrderItem();
            orderItem.setName(item.getName());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setImage(item.getImage());
            orderItem.setPrice(item.getPrice());
            products product = productRepository.findById(item.getProductId()).orElseThrow(()-> new RuntimeException("Product Id not found"));

            orderItem.setProducts(product);
            totalItemsAmount += item.getPrice() * item.getQuantity();
            order.getOrderItems().add(orderItem);
        }
        order.setTotalItemsAmount(totalItemsAmount);
        double totalAmount =0;
        double taxAmount=10;
        totalAmount = totalItemsAmount + taxAmount;
        order.setTotalAmount(totalAmount);
        order.setTaxAmount(taxAmount);
        String refId = UUID.randomUUID().toString();
        order.setOrderNo(refId);
         ordersRepository.save(order);
         return  new orderCreated(refId);
    }
    public Orders getOrder(String orderNo)
    {
       return  ordersRepository.findByOrderNo(orderNo).orElseThrow(()->new RuntimeException("Order No is not Found"));
    }
}
