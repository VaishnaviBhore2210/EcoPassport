package com.ecopassport.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true)
    String passportId;

    String name, category, manufacturer, originCountry, material,
            certifications, repairInstructions, recyclingInstructions,
            aiRecommendation, ecoRating, imageUrl;

    double weightKg, recycledContent, energyKwh, transportKm;
    boolean recyclable;
    boolean approved = false;
    Double carbonFootprint, sustainabilityScore;

    public Long getId() { return id; }
    public String getPassportId() { return passportId; }
    public void setPassportId(String x) { passportId = x; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getManufacturer() { return manufacturer; }
    public String getOriginCountry() { return originCountry; }
    public String getMaterial() { return material; }
    public String getCertifications() { return certifications; }
    public String getRepairInstructions() { return repairInstructions; }
    public String getRecyclingInstructions() { return recyclingInstructions; }
    public String getAiRecommendation() { return aiRecommendation; }
    public String getEcoRating() { return ecoRating; }
    public double getWeightKg() { return weightKg; }
    public double getRecycledContent() { return recycledContent; }
    public double getEnergyKwh() { return energyKwh; }
    public double getTransportKm() { return transportKm; }
    public boolean isRecyclable() { return recyclable; }
    public Double getCarbonFootprint() { return carbonFootprint; }
    public Double getSustainabilityScore() { return sustainabilityScore; }
    public void setCarbonFootprint(Double x) { carbonFootprint = x; }
    public void setSustainabilityScore(Double x) { sustainabilityScore = x; }
    public void setEcoRating(String x) { ecoRating = x; }
    public void setAiRecommendation(String x) { aiRecommendation = x; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String x) { imageUrl = x; }
    public boolean isApproved() { return approved; }
    public void setApproved(boolean x) { approved = x; }
}
