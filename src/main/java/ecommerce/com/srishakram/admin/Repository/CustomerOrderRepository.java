package ecommerce.com.srishakram.admin.Repository;

import ecommerce.com.srishakram.models.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
    Optional<CustomerOrder> findByRazorpayOrderId(String razorPayOrderId);
}