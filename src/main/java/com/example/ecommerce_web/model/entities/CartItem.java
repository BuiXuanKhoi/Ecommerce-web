package com.example.ecommerce_web.model.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private int cartItemsID ;

    @Column(name = "quantity")
    @NotEmpty(message = "quantity is required")
    @NotNull(message = "quantity must not be null")
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @NotEmpty(message = "users is required")
    @NotNull(message = "users must not be null")
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    @NotEmpty(message = "book is required")
    @NotNull(message = "book must not be null")
    private Books books;
}
