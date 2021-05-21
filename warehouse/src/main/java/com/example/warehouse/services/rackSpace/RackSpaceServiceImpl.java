package com.example.warehouse.services.rackSpace;

import com.example.warehouse.model.RackSpace;
import com.example.warehouse.model.RackSpaceStatus;
import com.example.warehouse.model.Seller;
import com.example.warehouse.model.User;
import com.example.warehouse.payload.request.RackSpaceRequest;
import com.example.warehouse.repository.RackSpaceRepository;
import com.example.warehouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RackSpaceServiceImpl implements RackSpaceService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RackSpaceRepository rackSpaceRepository;

    @Override
    public List<RackSpaceRequest> rackSpaces() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        User user = userRepository.findByLogin(name).get();
        Seller seller = user.getSeller();
        List<RackSpace> rackSpaces = rackSpaceRepository.findBySeller(seller);
        return rackSpaces.stream().map(RackSpaceRequest::new).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> addRackSpace(RackSpace rackSpace) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        User user = userRepository.findByLogin(name).get();
        Seller seller = user.getSeller();
        rackSpace.setSeller(seller);
        rackSpace.setStatus(RackSpaceStatus.Wolny);
        rackSpaceRepository.save(rackSpace);
        return ResponseEntity.ok("RackSpace was save");
    }

    @Override
    public RackSpaceRequest getRackSpace(long id) {
        return new RackSpaceRequest(rackSpaceRepository.findById(id));
    }

    @Override
    public void deleteRackSpace(long id) {
        rackSpaceRepository.deleteById(id);
    }

    @Override
    public void takeIt(long id) {
        RackSpace rackSpace= rackSpaceRepository.findById(id);
        if(rackSpace.getStatus().equals(RackSpaceStatus.Zarezerwowany)){
            rackSpace.setStatus(RackSpaceStatus.Zajety);
        }
        rackSpaceRepository.save(rackSpace);
    }

    @Override
    public void freeUp(long id) {
        RackSpace rackSpace= rackSpaceRepository.findById(id);
        if(rackSpace.getStatus().equals(RackSpaceStatus.Zajety)){
            rackSpace.setStatus(RackSpaceStatus.Wolny);
        }
        rackSpaceRepository.save(rackSpace);
    }

}
