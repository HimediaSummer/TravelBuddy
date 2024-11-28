
package travelbuddy.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Profile 이미지
    @Value("${image.profile.resource-locations}")
    private String profileResourceLocation;
    @Value("${image.profile.resource-handler}")
    private String profileResourceHandler;

    // Buddy 이미지
    @Value("${image.buddy.resource-locations}")
    private String buddyResourceLocation;
    @Value("${image.buddy.resource-handler}")
    private String buddyResourceHandler;

    @Value("${image.add-resource-locations}")
    private String ADD_RESOURCE_LOCATION;

    @Value("${image.add-resource-handler}")
    private String ADD_RESOURCE_HANDLER;


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(ADD_RESOURCE_HANDLER)
                .addResourceLocations(ADD_RESOURCE_LOCATION);

        // Profile 이미지
        registry.addResourceHandler(profileResourceHandler)
                .addResourceLocations(profileResourceLocation);

        // Buddy 이미지
        registry.addResourceHandler(buddyResourceHandler)
                .addResourceLocations(buddyResourceLocation);
    }
}
