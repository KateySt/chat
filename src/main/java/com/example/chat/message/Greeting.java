package com.example.chat.message;

import lombok.Builder;

@Builder
public record Greeting(
        String content
) {
}
