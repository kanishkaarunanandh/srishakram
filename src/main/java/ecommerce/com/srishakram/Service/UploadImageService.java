package ecommerce.com.srishakram.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class UploadImageService {
    @Value("${aws.region}")
    private String region;

    @Value("${aws.s3.bucket}")
    private String bucket;

    private S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.of(region))
                .build();
    }

    // Upload file
    // UploadImageService.java
    // Upload file
    // UploadImageService.java
    public String uploadFile(MultipartFile file) throws IOException {
        // Auto decide folder (images/ or videos/)
        String prefix = file.getContentType() != null && file.getContentType().startsWith("video/")
                ? "videos/"
                : "images/";

        String key = prefix + UUID.randomUUID() + "_" + file.getOriginalFilename();

        getS3Client().putObject(
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(key)
                        .contentType(file.getContentType())
                        .build(),
                RequestBody.fromInputStream(file.getInputStream(), file.getSize()) // ✅ safe for large files
        );

        return "https://" + bucket + ".s3." + region + ".amazonaws.com/" + key;
    }




    public byte[] downloadFile(String key) throws IOException {
        Path tempFile = Files.createTempFile("s3file-", ".tmp");

        getS3Client().getObject(
                GetObjectRequest.builder()
                        .bucket(bucket)
                        .key(key)
                        .build(),
                tempFile
        );

        return Files.readAllBytes(tempFile);
    }

}
