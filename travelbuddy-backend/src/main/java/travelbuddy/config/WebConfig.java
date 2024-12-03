
package travelbuddy.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//    // Profile 이미지
//    @Value("${image.profile.image-dir}")
//    private String profileImgDir;
//    @Value("${image.profile.image-url}")
//    private String profileImgUrl;
//
//    // Buddy 이미지
//    @Value("${image.buddy.image-dir}")
//    private String buddyImgDir;
//    @Value("${image.buddy.image-url}")
//    private String buddyImgUrl;

    @Value("${image.add-resource-locations}")
    private String ADD_RESOURCE_LOCATION;

    @Value("${image.add-resource-handler}")
    private String ADD_RESOURCE_HANDLER;


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(ADD_RESOURCE_HANDLER)
                .addResourceLocations(ADD_RESOURCE_LOCATION);

        // Profile 이미지
//        String absoluteProfileImgDir = Paths.get(profileImgDir).toAbsolutePath().toString();
//        registry.addResourceHandler("/productimgs/**")
//                .addResourceLocations("file:" + absoluteProfileImgDir + "/");
//
//        // Buddy 이미지
//        String absoluteBuddyImgDir = Paths.get(buddyImgDir).toAbsolutePath().toString();
//        registry.addResourceHandler("/productimgs/**")
//                .addResourceLocations("file:" + absoluteBuddyImgDir + "/");
    }
}
