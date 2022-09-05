package com.example.ecommerce_web.model.entities;

import com.example.ecommerce_web.model.UserState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "password")
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "states")
    private UserState userState;

    @Column(name = "lock_time")
    private Date lockTime;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Orders> orders;

    @OneToOne(mappedBy="users",fetch = FetchType.LAZY)
    private Information information;

    @OneToMany(mappedBy = "users")
    private List<Books> books;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CartItem> cartItems;

    public Users(String userName, String password, Role role, UserState userState, Date lockTime) {
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.userState = userState;
        this.lockTime = lockTime;
    }
}
