package ecommerce.com.srishakram.admin.Controllers;

import ecommerce.com.srishakram.admin.Repository.UsersRepository;
import ecommerce.com.srishakram.models.Users;
import ecommerce.com.srishakram.utils.CustomerIdGenerator;
import ecommerce.com.srishakram.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;


import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UsersRepository usersRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, jakarta.servlet.ServletException
    {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");

        Optional<Users> userOptional = usersRepository.findByEmail(email);

        Users user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            user = Users.builder()
                    .email(email)
                    .password(passwordEncoder.encode("GOOGLE_USER"))
                    .role("ROLE_USER")
                    .customerId(CustomerIdGenerator.generate())
                    .build();

            usersRepository.save(user);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        response.sendRedirect("http://localhost:3000/oauth-success?token=" + token);
    }
}
