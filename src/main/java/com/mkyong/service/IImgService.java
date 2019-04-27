package com.mkyong.service;
import com.mkyong.model.FileKeyValue;
import com.mkyong.model.MFile;
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
    void replaceImages(List < MultipartFile > files, List<MFile> index,String folder) throws IOException;
    List<MFile> convertType(String[] strArray);
    void renameFilesName(String path);
    void deleteItems(String path, List<MFile> files, boolean flag);
    void fileUpload(String path, int index, MultipartFile file) throws IOException;
    void renameFiles(int i,String path);
    void deleteItem(int i,String folder,boolean flag);
    void dragDrop(List<FileKeyValue> fileKeyValues, String folder);
    String getPath(String folder);
    File[] getAllFiles(String folder);
    HashMap<String, ArrayList<File>> getResourceFolderFiles(String folder) throws IOException;
}
