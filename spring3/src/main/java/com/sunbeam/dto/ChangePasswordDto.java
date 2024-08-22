package com.sunbeam.dto;

public class ChangePasswordDto {
    private Long userId;
    private String oldPassword;
    private String newPassword;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

	@Override
	public String toString() {
		return "ChangePasswordDto [userId=" + userId + ", oldPassword=" + oldPassword + ", newPassword=" + newPassword
				+ "]";
	}
}

