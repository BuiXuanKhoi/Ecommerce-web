package com.example.ecommerce_web.service;

import com.example.ecommerce_web.model.dto.request.CartItemRequestDTO;
import com.example.ecommerce_web.model.dto.respond.CartItemRespondDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CartItemService {

    CartItemRespondDTO addToCart(CartItemRequestDTO cartItemRequestDTO);

    List<CartItemRespondDTO> getListCartItem();

    ResponseEntity<?> deleteCartItem(int cartItemId);





}
