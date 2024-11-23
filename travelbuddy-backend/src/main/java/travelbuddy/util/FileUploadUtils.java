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

        // 기본적으로 파일 삭제 실패로 설정
        boolean result = false;

        // uploadDir이나 fileName이 null인 경우 예외 처리
        if (uploadDir == null || fileName == null) {
            log.error("Directory or file name cannot be null. uploadDir: {}, fileName: {}", uploadDir, fileName);
            return result; // 실패 반환
        }

        Path uploadPath = Paths.get(uploadDir);

        // 디렉토리가 존재하지 않을 경우 로그 출력
        if (!Files.exists(uploadPath)) {
            log.warn("Directory does not exist: {}", uploadDir);
            return true; // 디렉토리가 없으므로 삭제 완료로 간주
        }

        try {
            // 파일 경로 생성 및 삭제
            Path filePath = uploadPath.resolve(fileName);
            Files.deleteIfExists(filePath); // 파일이 존재하면 삭제, 없으면 무시
            result = true; // 삭제 성공
            log.info("File deleted successfully: {}", filePath);
        } catch (IOException ex) {
            log.error("Could not delete file: {}", fileName, ex);
        }

        return result;






//        boolean result = false;
//        Path uploadPath = Paths.get(uploadDir);
//        if(!Files.exists(uploadPath)) {
//            result = true;
//        }
//        try {
//            Path filePath = uploadPath.resolve(fileName);
//            Files.delete(filePath);
//            result = true;
//        }catch (IOException ex){
//            log.error("Could not delete file: {}", fileName, ex);
//        }
//        return result;


    }
}
