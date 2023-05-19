package com.example.chat.message;

import lombok.Builder;

@Builder
public record HelloMessage(
        String name
) {
}
