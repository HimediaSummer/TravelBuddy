package travelbuddy.util;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUploadUtils {
	
	private static final Logger log = LoggerFactory.getLogger(FileUploadUtils.class);


	public static String saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {

        Path uploadPath = Paths.get(uploadDir);

        if(!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String replaceFileName = fileName + "." + FilenameUtils.getExtension(multipartFile.getResource().getFilename());

        try(InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(replaceFileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);

        }catch (IOException ex){
            throw new IOException("Could not save file: " + fileName, ex);
        }

        return replaceFileName;
    }

    public static boolean deleteFile(String uploadDir, String fileName) {

        // fileName이 null이거나 비어있으면 바로 true 반환
        if(fileName == null || fileName.isEmpty()) {
            return true;
        }

        boolean result = false;
//        Path uploadPath = Paths.get(uploadDir);

//        if(!Files.exists(uploadPath)) {
//            result = true;
//        }
        try {
            Path uploadPath = Paths.get(uploadDir);

            if(!Files.exists(uploadPath)) {
                result = true;
            }

            Path filePath = uploadPath.resolve(fileName);

            // 파일이 존재할 경우에만 삭제 시도
            if(Files.exists(filePath)) {
                Files.delete(filePath);
                result = true;
            } else {
                result = true; // 파일이 이미 없는 경우도 성공으로 처리
            }

//            Files.delete(filePath);
//            result = true;
        }catch (IOException ex){

            log.error("Could not delete file: {}", fileName, ex);
        }

        return result;
    }

}
