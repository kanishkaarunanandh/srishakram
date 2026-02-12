package ecommerce.com.srishakram.utils;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import ecommerce.com.srishakram.models.Users;

@Component
public class JwtUtil {

    private final String  SECREAT ="sri shakram 2026 e-commerce silk saree";
    private final long EXPIRATION  = 1000*60*60*2;
    private final Key secretKey = Keys.hmacShaKeyFor(SECREAT.getBytes(StandardCharsets.UTF_8));


    public String generateToken(String email,String role)
    {
        return Jwts.builder()
                .setSubject(email)
                .claim("role" , role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractEmail(String token)
    {
        return   Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

    }
    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }
    public boolean validateJwtToken(String token){
        try{
            extractEmail(token);
            return true;
        }
        catch (JwtException exception)
        {
            return  false;
        }
    }


}