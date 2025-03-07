package com.collegeexplorer.collegetourapp.payload;



import lombok.Data;

@Data
public class ReviewRequest {
    private int rating;
    private String comment;
}