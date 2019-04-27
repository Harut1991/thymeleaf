package com.mkyong.service;
import com.mkyong.model.FileKeyValue;
import com.mkyong.model.MFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ImgService implements IImgService {

    @Override
    public void replaceImages(List<MultipartFile> files, List<MFile> index, String folder) throws IOException {
        for(int i =0; i< files.size(); i++){
            String destination = getPath(folder) + "/" + index.get(i).getName();
            File fileUpload = new File(destination);
            files.get(i).transferTo(fileUpload);
        }
    }

    @Override
    public List<MFile> convertType(String[] strArray) {
        List<MFile> index = new ArrayList<>();
        for (String s: strArray){
            MFile newFile = new MFile();
            newFile.setName(s);
            index.add(newFile);
        }
        return index;
    }

    @Override
    public void renameFilesName(String folder) {
        File[] files = getAllFiles(folder);
        Arrays.sort( files, new Comparator<File>() {
            public int compare( File a, File b ) {
                return a.getName().compareTo( b.getName() );
            }
        } );
        String path = getPath(folder);
        for (int i=0;i<files.length;i++){
            if(Integer.parseInt(files[i].getName().replace(".png", "")) != (i+1)){
                File file1 = new File(path + "/" + files[i].getName());
                File file2 = new File(path + "/" + (i+1) + ".png");
                if (file1.renameTo(file2))
                    System.out.println("Renamed successfully");
                else
                    System.out.println("Error");
            }
        }
    }

    @Override
    public void deleteItems(String folder, List<MFile> files, boolean flag) {
        String pathName = getPath(folder);
        for (final MFile file : files) {
            File deletingfile = new File(pathName + "/" + file.getName());
            Path pathToBeDeleted = Paths.get(deletingfile.getAbsolutePath());
            try {
                Files.delete(pathToBeDeleted);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if (flag){
            this.renameFilesName(folder);
        }
    }

    @Override
    public void fileUpload(String path, int index, MultipartFile file) throws IOException {
        deleteItem(index,path, false);
        String destination = getPath(path) + "/" + index + ".png";
        File fileUpload = new File(destination);
        file.transferTo(fileUpload);
    }

    @Override
    public void renameFiles(int i, String path) {
        File file = new File(path + "/" + i + ".png");
        if(file.exists() && !file.isDirectory()) {
            File file2 = new File(path + "/" + (i-1) + ".png");
            if (file.renameTo(file2))
                System.out.println("Renamed successfully");
            else
                System.out.println("Error");
            renameFiles(i+1, path);
        }
    }

    @Override
    public void deleteItem(int i, String folder, boolean flag) {
        String path = getPath(folder);
        File file = new File(path + "/" + i + ".png");
        Path pathToBeDeleted = Paths.get(file.getAbsolutePath());
        try {
            Files.delete(pathToBeDeleted);
            if (flag) {
                renameFiles(i + 1, path);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void dragDrop(List<FileKeyValue> fileKeyValues, String folder) {

        for (final FileKeyValue fileKeyValue : fileKeyValues) {
            if (!fileKeyValue.getKey().equals(fileKeyValue.getValue())){
                String path = getPath(folder);
                File file1 = new File(path + "/" + fileKeyValue.getValue() + ".png");
                File file2 = new File(path + "/" + fileKeyValue.getKey() + "_.png");
                if (file1.renameTo(file2))
                    System.out.println("Renamed successfully");
                else
                    System.out.println("Error");
            }
        }
        File[] files = this.getAllFiles(folder);
        String path = this.getPath(folder);
        for (final File file : files) {
            String name = file.getName();
            int pos = name.lastIndexOf(".");
            if (pos > 0) {
                name = name.substring(0, pos);
            }

            if(name.endsWith("_")){
                File file1 = new File(path + "/" + file.getName().replace("_",""));
                File file2 = new File(path + "/" + file.getName());
                if (file2.renameTo(file1))
                    System.out.println("Renamed successfully");
                else
                    System.out.println("Error");
            }
        }
    }

    @Override
    public String getPath(String folder) {
        ClassLoader loader = Thread.currentThread().getContextClassLoader();
        URL url = loader.getResource(folder);
        String path = url.getPath();
        return path;
    }

    @Override
    public File[] getAllFiles(String folder) {
        File[] files = new File(getPath(folder)).listFiles();
        return files;
    }

    @Override
    public HashMap<String, ArrayList<File>> getResourceFolderFiles(String folder) throws IOException {
        File[] files = getAllFiles(folder);
        Arrays.sort(files);
        ArrayList<File> retouching = new ArrayList<>();
        ArrayList<File> required = new ArrayList<>();
        ArrayList<File> additional = new ArrayList<>();
        for (int i = 0; i< files.length; i++) {

            String name = files[i].getName();
            int pos = name.lastIndexOf(".");
            if (pos > 0) {
                name = name.substring(0, pos);
            }
            if (Integer.parseInt(name) == 1) {
                retouching.add(files[i]);
            }else if (Integer.parseInt(name)<= 5)  {
                required.add(files[i]);
            }else {
                additional.add(files[i]);
            }
        }
        HashMap<String, ArrayList<File>> returnData = new HashMap<>();
        returnData.put("retouching", retouching);
        returnData.put("required", required);
        returnData.put("additional", additional);
        return returnData;
    }
}
