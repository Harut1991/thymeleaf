package com.mkyong.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mkyong.model.FileKeyValue;
import com.mkyong.model.MFile;
import com.mkyong.service.IImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;

@Controller
public class FileController {
    final String staticFolder = "static/files";

    @Autowired
    private IImgService imgService;

    @GetMapping("/")
    public String main(Model model) throws IOException {
        model.addAttribute("files", this.imgService.getResourceFolderFiles(this.staticFolder));
        model.addAttribute("generatedString", "abcd789");
        return "index";
    }

    @RequestMapping(value = "/dragDrop", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> dragDrop(@RequestBody String object) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<FileKeyValue> fileKeyValues = objectMapper.readValue(object, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, FileKeyValue.class));

        this.imgService.dragDrop(fileKeyValues, this.staticFolder);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteItems", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> deleteItems(@RequestBody String object) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<MFile> files = objectMapper.readValue(object, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, MFile.class));
        this.imgService.deleteItems(this.staticFolder, files, true);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @DeleteMapping("deleteItem/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable("id") Integer id) {
        this.imgService.deleteItem(id, this.staticFolder, true);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("index") int index) throws IOException {
        this.imgService.fileUpload(this.staticFolder, index, file);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/uploadImages", method = RequestMethod.POST)
    public ResponseEntity<String> uploadImages(MultipartHttpServletRequest request) throws IOException {
        List<MultipartFile> files = request.getFiles("files");
        List<MFile> index = this.imgService.convertType(request.getParameter("index").split(","));
        this.imgService.deleteItems(this.staticFolder, index, false);
        this.imgService.replaceImages(files, index, this.staticFolder);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}