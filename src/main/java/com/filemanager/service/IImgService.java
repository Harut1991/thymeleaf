package com.filemanager.service;
import com.filemanager.model.FileKeyValueDTO;
import com.filemanager.model.FileDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by spire on 4/20/19.
 */
public interface IImgService {
    void replaceImages(List < MultipartFile > files, List<FileDTO> index, String folder) throws IOException;
    List<FileDTO> convertType(String[] strArray);
    void renameFilesName(String path);
    void deleteItems(String path, List<FileDTO> files, boolean flag);
    void fileUpload(String path, int index, MultipartFile file) throws IOException;
    void renameFiles(int index, String path);
    void deleteItem(int index, String folder, boolean flag);
    void dragDrop(List<FileKeyValueDTO> fileKeyValues, String folder);
    String getPath(String folder);
    File[] getAllFiles(String folder);
    HashMap<String, ArrayList<File>> getResourceFolderFiles(String folder) throws IOException;
}
