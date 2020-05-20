package org.artur.masterdetail.data;

import java.util.List;
import java.util.Optional;

public interface CrudEndpoint<T, IDTYPE> {

    public List<T> list(int offset, int limit);

    public Optional<T> get(IDTYPE id);

    public T update(T entity);

    public void delete(IDTYPE id);

    public int count();

}