package ecommerce.com.srishakram.admin.Controllers;

import ecommerce.com.srishakram.admin.Service.CustomerOrderService;
import ecommerce.com.srishakram.admin.Service.UsersService;
import ecommerce.com.srishakram.models.CustomerOrder;
import ecommerce.com.srishakram.models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class CustomerOrderController {

    @Autowired
    private CustomerOrderService customerOrderService;
    @Autowired
    private UsersService userService;

    @PostMapping("/create-order")
    public ResponseEntity<CustomerOrder> createOrder(@RequestBody CustomerOrder customerOrder) {
        try {
            Users loggedInUser = userService.findByEmail(customerOrder.getEmail());
            if (loggedInUser == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            // Set order status based on payment method
            if ("COD".equalsIgnoreCase(customerOrder.getPaymentMethod())) {
                customerOrder.setOrderStatus("COD"); // directly mark as COD
                customerOrder.setRazorpayOrderId(null); // no Razorpay order
            } else {
                customerOrder.setOrderStatus("created"); // default for online payments
            }

            CustomerOrder createdOrder = customerOrderService.createOrder(customerOrder, loggedInUser);

            // Only for online payment: create Razorpay order and update razorpayOrderId
            if (!"COD".equalsIgnoreCase(customerOrder.getPaymentMethod())) {
                // call Razorpay and set razorpayOrderId here
                // customerOrder.setRazorpayOrderId(razorpayOrder.getId());
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




    @PostMapping("/handle-payment-callback")
    public ResponseEntity<Map<String, Object>> handlePaymentCallback(@RequestBody Map<String, String> payload) {
        try {
            CustomerOrder updatedOrder = customerOrderService.updateOrder(payload);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Payment verified successfully",
                    "orderId", updatedOrder.getOrderId(),
                    "status", updatedOrder.getOrderStatus()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }
}